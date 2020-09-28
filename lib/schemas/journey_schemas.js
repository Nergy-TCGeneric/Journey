module.exports = function(mongoose) {
    return {
        user_schema: new mongoose.Schema({
            id: {
                type: String,
                required: true,
                unique: true,
                trim: true
            },
            password: {
                type: String,
                required: true,
                trim: true
            },
            pathway_ids: [mongoose.ObjectId],
            last_login: Date
        }),
        pathway_schema: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            owner_id: {
                type: String,
                required: true
            },
            granted_user_ids: [String],
            todos: [mongoose.ObjectId],
            created_date: Date
        }),
        todo_schema: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            description: String,
            creator_id: {
                type: String,
                required: true
            },
            has_deadline: Boolean,
            deadline: Date,
            deadline_bonus: Number,
            significance: Number,
            category: mongoose.ObjectId
        }),
        category_schema: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                unique: true
            },
            color: String
        })
    }
}