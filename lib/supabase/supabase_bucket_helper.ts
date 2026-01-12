import { createClient } from "./supabase_browser"


const supabase = createClient()


export async function readJsonFromBucket(lang: string, bucket: string): Promise<any> {
    const { data, error } = await supabase.storage
        .from(bucket)
        .download(`dictionaries/${lang}.json`)
    if (error) throw error
    const text = await data.text()
    return JSON.parse(text)
}

export async function writeJsonToBucket(lang: string, json: any, bucket: string): Promise<void> {
    const { error } = await supabase.storage
        .from(bucket)
        .upload(`dictionaries/${lang}.json`, JSON.stringify(json, null, 2), {
            upsert: true,
            contentType: 'application/json',
        })
    if (error) throw error
}

export async function listLanguageFiles(bucket: string): Promise<{ name: string, url: string }[]> {
    const { data, error } = await supabase.storage
        .from(bucket)
        .list('dictionaries', {
            limit: 100,
            offset: 0,
        })

    if (error) throw error

    return data
        .filter(file => file.name.endsWith('.json'))
        .map(file => ({
            name: file.name.replace('.json', ''),
            url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/aceteka-main-content/dictionaries/${file.name}`
        }))
}



// Upload file using standard upload
export async function uploadFile(bucketName: string, filePath: string, file: any) {
    try {
        const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);

        if (error) {
            console.error('Upload error:', error);
            throw new Error(`Upload failed: ${error.message}`);
        }

        if (!data) {
            throw new Error('Upload failed: No data returned');
        }

        console.log('Upload success:', data);
        return data;
    } catch (error) {
        console.error('Could not upload file:', error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
}

//upload buffer
export const uploadBufferToSupabase = async (userId: string, file: Buffer, bucketName: string, uid: string, fileName: string): Promise<string> => {
    const filePath = `${userId}/videos/${uid}/${fileName}.webm`;

    // Convert Buffer to Blob
    const uint8Array = new Uint8Array(file);
    const blob = new Blob([uint8Array], { type: 'video/webm' });

    try {
        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage.from(bucketName).upload(filePath, blob, {
            cacheControl: '3600',
            upsert: true, // Optionally override existing files
        });

        if (error) {
            console.error('Error uploading file:', error.message);
            throw new Error('File upload failed');
        }

        console.log(`File uploaded successfully to ${filePath}`);
        return data?.path || ''; // Return the file path or URL as needed
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('File upload failed');
    }
};


// Override file using standard upload
export async function overrideFile(bucketName: string, filePath: string, file: any) {

    const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, {
        upsert: true,
    })
    if (error) {
        // Handle error
        console.log('Could not upload file: ', error)
    } else {
        // Handle success
        console.log('success')
    }
    return data;
}

// Upload file using standard upload and file type
export async function uploadFileType(bucketName: string, filePath: string, file: any, fileType: string) {
    const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, {
        contentType: fileType,
    })
    if (error) {
        // Handle error
        console.log('Could not upload file: ', error)
    } else {
        // Handle success
        console.log('success')
    }
    return data;
}

// Move file using standard 
export async function moveFile(bucketName: string, fromFolderName: string, fileName: string, toFolderName: string) {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .move(`${fromFolderName}/${fileName}`, `${toFolderName}/${fileName}`)

    if (error) {
        // Handle error
        console.log('Could not move file: ', error)
    } else {
        // Handle success
        console.log('success')
    }
    return data;
}

// Delete file using standard 
export async function deleteFiles(bucketName: string, files: any) {
    //requires an array of file paths example
    //await supabase.storage.from('bucket').remove(['object-path-2', 'folder/avatar2.png'])

    const { data, error } = await supabase.storage.from(bucketName).remove(files)

    if (error) {
        // Handle error
        console.log('Could not move file: ', error)
    } else {
        // Handle success
        console.log('success')
    }
    return data;
}

// list file using standard 
export async function listFilesFolder(bucketName: string, folder: string) {

    const { data, error } = await supabase
        .storage
        .from(bucketName)
        .list(folder, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        })

    if (error) {
        // Handle error
        console.log('Could not move file: ', error)
    } else {
        // Handle success
        console.log('success')
    }
    return data;
}

// list file using standard 
export async function searchFilesFolder(bucketName: string, folder: string, key: string) {

    const { data, error } = await supabase
        .storage
        .from(bucketName)
        .list(folder, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
            search: key
        })

    if (error) {
        // Handle error
        console.log('Could not move file: ', error)
    } else {
        // Handle success
        console.log('success')
    }
    return data;
}

// download file using standard 
export async function downloadFile(bucketName: string, filePath: string) {

    const { data, error } = await supabase
        .storage
        .from(bucketName)
        .download(filePath)

    if (error) {
        // Handle error
        console.log('Could not move file: ', error)
    } else {
        // Handle success
        console.log('success')
    }
    return data;
}

// get url file using standard 
export async function getFileUrl(bucketName: string, filePath: string) {
    try {
        const { data } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(filePath);

        if (!data?.publicUrl) {
            throw new Error('Failed to get public URL');
        }

        console.log('Got public URL:', data.publicUrl);
        return data;
    } catch (error) {
        console.error('Could not get file URL:', error);
        throw error;
    }
}