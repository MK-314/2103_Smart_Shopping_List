class SessionManager {
    static results = []
    static addModel(datamodel) {
        this.results.push(datamodel)
    }
    static getResults() {
        return this.results
    }
    static getById(id) {
        for (const model in this.results) {
            if (model.index == id) {
                return model
            }
        }
    }
    static deleteById(id) {
        let swap = []
        for (const model in this.results) {
            if (model.index !== id) {
                swap.push(model)
            }
        }
        this.results = swap
    }
    static isEmpty() {
        return this.results.length == 0
    }
}

class DataModel {
    constructor(index, name, result) {
        this.index = index
        this.name = name
        this.result = result
    }

}
module.exports = {
    DataModel: DataModel,
    SessionManager: SessionManager
}