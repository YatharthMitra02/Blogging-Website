console.log("Environment variables:", import.meta.env);

const Conf ={
    
    appWrite: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteDB: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWritePI: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteCI: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBI: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    

}










export default Conf