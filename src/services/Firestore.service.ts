import { DocumentData, Firestore, WhereFilterOp } from './data/firebase';

export default class FirestoreService {
    /**
     * @author Mohamad Abdel Rida
     */
    db = Firestore;

    public async deleteDoc(collection: string, id: string): Promise<void> {
        /**
         * @author Mohamad Abdel Rida
         * @param id: Absolute id to the document
         * Deletes a document with a given id. May fail due to
         * firebase rules so handle errors accordingly.
         * For posts, ensure that the users uid matches the uid field in the post
         * being deleted.
         *
         */
        console.log(id);
        try {
            await this.db.collection(collection).doc(id).delete();
        } catch (error) {
            console.error(error);
        }
    }

    public async fetchDoc<DocType>(path: string): Promise<DocumentData | undefined | null> {
        /**
         * Fetches a document from the given id or path
         */
        try {
            const doc = await this.db.doc(path).get();
            return doc.data() as DocType;
        } catch (e) {
            return null;
        }
    }
    /**
     * @author Mohamad Abdel Rida
     * @param collection: the collection to get the documents from
     * @param field: the field to execute the query on
     * @param operator: the query operator to use;
     * @param value: the value to query with
     * Example: collection = users, field = uid, value = "Some UID", operator = '=='
     * @returns Promise of an Array with Document data <T>
     * Executes a query on a given collection and maps a DocType onto the results
     * Map
     */
    public async query<T>(
        collection: string,
        field: string,
        operator: WhereFilterOp,
        value: string | Map<string, string | number> | Array<string | number> | number,
    ): Promise<Array<T>> {
        const query = (await this.db.collection(collection).where(field, operator, value).get()).docs.map(
            (doc) => doc.data() as T,
        );
        return query;
    }

    public async uploadDoc<DocType>(collection: string, fields: DocType): Promise<void> {
        /**
         * @author Mohamad Abdel Rida
         * @param collection the collection to add the document to 
         * @param fields an object of type <DocType> to insert into the document
            May fail according to firebase rules. Please check console if an error is happening with
            a document upload
            
         * Uploads some Document with Doctype to a collection
         * Validates DocTypes and
         * 
        */
        try {
            await this.db.collection(collection).doc().set(fields);
        } catch (e) {
            // Catch permission errors and display them to a user
            console.log(e);
        }
    }
}
