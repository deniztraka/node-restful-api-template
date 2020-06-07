import QueryRecordsValidator from "./validators/queryRecordsValidator";

export default class RecordsService {
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
        return await this.repository.addItem(objectToAdd);
    }

    /**
     * Queries objects with given query object
     * 
     * @param {Object} queryObj 
     * @return {Array} array of objects
     */
    async queryItems(queryObj) {
        QueryRecordsValidator.validate(queryObj);

        return await this.repository.queryItems(queryObj);
    }
}