const connection = require('../config/db')

module.exports = {
    mListHistory: (id, param, sort ,offset, limit) => {
        return new Promise ((resolve, reject) => {
            connection.query(`SELECT history.created_at,
            history.from_id,
            history.to_id,
            history.amount,
            history.status,
            history.notes,
            user_from.name as from_name,
            user_from.image as from_image,
            user_to.name as to_name,
            user_to.image as to_image
            FROM history
        LEFT JOIN users as user_from
                        ON history.from_id=user_from.id
        LEFT JOIN users as user_to
                        ON history.to_id=user_to.id
            WHERE history.from_id = ${id} OR history.to_id = ${id}
            ORDER BY ${param} ${sort}
            LIMIT ${offset}, ${limit}
            `,(err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    mTotal: (id) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`SELECT COUNT(*) as total
            FROM history
            LEFT JOIN users as user_from
                ON history.from_id=user_from.id
            LEFT JOIN users as user_to
                ON history.to_id=user_to.id
            WHERE history.from_id = ${id} OR history.to_id = ${id}`
            ,(err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    mInsertHistory: (data) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`INSERT INTO history (from_id, to_id, amount, status, notes)
            VALUES ( '${data.from_id}', '${data.to_id}', '${data.amount}', '${data.status}', '${data.notes}' ) `
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    mUpdateHistory: (data, id) => {
        return new Promise ((resolve, reject)=>{
            connection
            .query(`UPDATE history SET ? WHERE id = ?`, [data, id]
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    mInsertHistory: (data) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`INSERT INTO history (from_id, to_id, amount, status, notes)
            VALUES ( '${data.from_id}', '${data.to_id}', '${data.amount}', '${data.status}', '${data.notes}' ) `
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    // kalau transfer sukses, to_id (user yang dituju) saldo nya bertambah
    // mTransferSuccess: (data) => {
    //     return new Promise ((resolve, reject)=>{
    //         connection.query(`
    //         UPDATE users SET
    //         balance = IF(id=${data.to_id}, balance+${data.amount}, balance-${data.amount})
    //         WHERE id IN (${data.to_id},${data.from_id})
    //         ` , (err, result)=>{
    //             if(err){
    //                 reject(new Error(err))
    //             }else{
    //                 resolve(result)
    //             }
    //         })
    //     })
    // }
}