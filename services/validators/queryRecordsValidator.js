import ValidationError from './validationError';
import moment from 'moment';

export default class QueryRecordsValidator {
    constructor() {}

    /**
     * Validates request payload for records query object
     * 
     * @param queryObject request payload object
     */
    static validate(queryObject) {
        let validationErrorMessages = [];

        if (!queryObject) {
            validationErrorMessages.push("Request payload is empty.");
        }

        if (!moment(queryObject.startDate, "YYYY-MM-DD", true).isValid()) {
            validationErrorMessages.push(`startDate is not valid: ${queryObject.startDate}`);
        }

        if (!moment(queryObject.endDate, "YYYY-MM-DD", true).isValid()) {
            validationErrorMessages.push(`endDate is not valid: ${queryObject.endDate}`);
        }

        if (isNaN(queryObject.minCount)) {
            validationErrorMessages.push(`minCount is not a number: ${queryObject.minCount}`);
        }

        if (isNaN(queryObject.maxCount)) {
            validationErrorMessages.push(`maxCount is not a number: ${queryObject.maxCount}`);
        }

        if(validationErrorMessages.length > 0){
            throw new ValidationError('Request payload is not valid.', validationErrorMessages);
          }
    }
}