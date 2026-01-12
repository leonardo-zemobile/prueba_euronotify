import { createClient } from "./supabase_browser"


const supabase = createClient();


export const getRow = async (table: string, id: string) => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
};

export const getAllData = async (table: string, batchSize: number = 1000) => {
  let allData: any[] = [];
  let from = 0;
  let to = batchSize - 1;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .range(from, to);

    if (error) throw new Error(error.message);

    if (data.length === 0) {
      break; // Stop fetching if no data is returned
    }

    allData = [...allData, ...data];

    // If returned data is less than batch size, it's the last page
    if (data.length < batchSize) {
      break;
    }

    from += batchSize;
    to += batchSize;
  }

  return allData;
};

export const getFilteredData = async (table: string, filter: any) => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .match(filter);

  return { data, error };
};

interface GetAllDataFilterOptions {
  inArray?: { key: string, values: any[] };
  match?: { [key: string]: any };
  select?: string; // e.g. 'id,title,price'
  limit?: number;
  order?: { column: string; ascending?: boolean };
}

/**
 * Dynamically filter any table using in, match, select, limit, and order
 */
export const getAllDataFilter = async (
  table: string,
  options: GetAllDataFilterOptions = {}
) => {
  let query = supabase.from(table).select(options.select || '*');

  if (options.inArray && options.inArray.values.length) {
    query = query.in(options.inArray.key, options.inArray.values);
  }

  if (options.match && Object.keys(options.match).length > 0) {
    query = query.match(options.match);
  }

  if (options.order) {
    query = query.order(options.order.column, { ascending: options.order.ascending ?? true });
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

interface FetchDataNestedOptions {
  nested?: string[]; // e.g. ['user', 'comments(user(*))']
  match?: { [key: string]: any };
  order?: { column: string; ascending?: boolean };
  limit?: number;
}

/**
 * Fetch data with optional nested relations using Supabase's foreign key select syntax
 */
export const fetchDataNested = async (
  table: string,
  options: FetchDataNestedOptions = {}
) => {
  // Build the select string dynamically
  const baseSelect = '*';
  const nestedSelect = options.nested?.map(relation => `${relation}(*)`).join(', ');
  const selectString = nestedSelect ? `${baseSelect}, ${nestedSelect}` : baseSelect;

  let query = supabase.from(table).select(selectString);

  if (options.match) {
    query = query.match(options.match);
  }

  if (options.order) {
    query = query.order(options.order.column, {
      ascending: options.order.ascending ?? true,
    });
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  return { data, error };
};


export const insertRow = async (table: string, rowData: any) => {
  const { data, error } = await supabase
    .from(table)
    .insert(rowData)
    .select('*')
    .single();

  return { data, error };
};

export const bulkInsert = async (table: string, rows: any) => {
  const { data, error } = await supabase
    .from(table)
    .insert(rows);

  return { data, error };
};

export const updateRow = async (table: string, id: string, updatedData: any) => {
  const { data, error } = await supabase
    .from(table)
    .update(updatedData)
    .eq('id', id)


  return { data, error };
};

export const updateRowSpecial = async (
  table: string,
  updatedData: any,
  columnName: string,
  value: any
) => {
  const { data, error } = await supabase
    .from(table)
    .update(updatedData)
    .eq(columnName, value)
    .single();

  return { data, error };
};


export const bulkUpdate = async (table: string, updates: any) => {
  const { data, error } = await supabase
    .from(table)
    .upsert(updates);

  if (error) throw new Error(error.message);
  return data;
};

// Delete a row by ID
export const deleteRowById = async (table: string, id: string) => {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq('id', id)
    .single();

  return { data, error };
};

//delete all ids from tebale
export const bulkDeleteRowsById = async (table: string, ids: string[]) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return { data: null, error: "No IDs provided for deletion." };
  }

  const { data, error } = await supabase
    .from(table)
    .delete()
    .in('id', ids);

  return { data, error };
};


// Delete a row where a specific column matches a given value
export const deleteRowByColumn = async (table: string, columnName: string, value: any) => {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq(columnName, value);

  return { data, error };
};

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  return { data, error };
};

// New: Upsert Row (General)
export const upsertRow = async (
  table: string,
  rowData: any,
  conflictColumns: string | string[] // Accept a single string or an array of strings
) => {
  // Join array of columns into a comma-separated string if necessary
  const onConflict = Array.isArray(conflictColumns)
    ? conflictColumns.join(",")
    : conflictColumns;

  const { data, error } = await supabase
    .from(table)
    .upsert(rowData, { onConflict });

  return { data, error };
};

// New: Upsert Row (Special Column)
export const upsertRowSpecial = async (
  table: string,
  rowData: any,
  conflictColumn: string
) => {
  const { data, error } = await supabase
    .from(table)
    .upsert(rowData, { onConflict: conflictColumn }) // Pass the string directly
    .single(); // Ensure single row is returned

  return { data, error };
};
