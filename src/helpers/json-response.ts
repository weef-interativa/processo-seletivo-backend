const ResponseService = {
    json: (message = '', success = false, resultSet = []) => {
        return {
            message,
            success,
            resultSet
        };
    }
};

export default ResponseService;
