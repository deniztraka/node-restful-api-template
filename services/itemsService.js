export default class ItemsService {
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Adds an item to repo
     * 
     * @param {Object} objectToAdd 
     * @return {Object} added item 
     */
    async addItem(objectToAdd) {
        let addedItem = null;
        try {
            //handle validation something
            addedItem = await this.repository.addItem(objectToAdd);
        } catch (err) {
            console.log(err);
        }
        return addedItem;
    }

    /**
     * Queries objects with given query object
     * 
     * @param {Object} queryObj 
     * @return {Array} array of objects
     */
    async queryItems(queryObj) {
        let items = [];
        try {
            items = await this.repository.queryItems(queryObj);           
        } catch (err) {
            console.log(err);
        }
        return items;
    }
}