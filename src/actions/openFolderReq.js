const openFolderReq = async (type ='audio') => {
    try {
        const result = await (await fetch('http://localhost:3000/openFolder', {
            method: 'POST',
            body: JSON.stringify({ type }),
            headers: {
                'content-type': 'application/json'
            }
        })).json();
        console.log('[edit] ok:', result);
        return result;
    } catch (error) {
        console.error('[edit] err:', error);
    }
}

export default openFolderReq;