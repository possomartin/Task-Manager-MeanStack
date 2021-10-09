const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        _userId: {
            type: mongoose.Types.ObjectId,
            required: true
        }

    }
)

const List = module.exports = mongoose.model('List', ListSchema);

module.exports.getLists = (userId, callback) => {
    List.find({_userId: userId}, callback);
}

module.exports.getListById = (id, callback) => {
    List.findById(id, callback);
}

module.exports.addList = (newList, callback) =>
{
    newList.save(callback);
}

module.exports.updateList = (id, userId, newTitle, callback) => {
    List.findOneAndUpdate({_id: id, _userId: userId}, {$set: newTitle}, callback);
}

module.exports.removeList = (id, userId, callback) => {
    List.findOneAndRemove({_id: id, _userId: userId}, callback);
}