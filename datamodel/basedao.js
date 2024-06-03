const {reject} = require("bcrypt/promises");
module.exports = class BaseDAO {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    delete(id) {
        return this.db.query(`DELETE FROM ${this.tablename} WHERE id=$1`, [id])
    }
    getById(id) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM ${this.tablename} WHERE id=$1`, [id])
                .then(res => resolve(res))
                .catch(e => reject(e)))
    }
    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM ${this.tablename}`)
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
}