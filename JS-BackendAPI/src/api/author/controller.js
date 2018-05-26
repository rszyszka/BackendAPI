import {notFound, success} from '../../services/response/'
import Authors from './model'
import Books from "../book/model";

export const index = (req, res, next) => {
    return Authors.find()
        .then((authors) => authors.map((author) => author.view()))
        .then(success(res))
        .catch(next)
};

export const show = (req, res, next) => {
    const id = req.params.id;
    return Authors.findById(id)
        .then(notFound(res))
        .then((author) => author ? author.view('full') : null)
        .then(success(res))
};

export const create = (req, res, next) => {
    const body = req.body;
    Authors.create(body)
        .then((author) => author.view('full'))
        .then(success(res))
        .catch(next)
};

export const update = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    return Authors.findById(id)
        .then(notFound(res))
        .then((author) => author ? Object.assign(author, body).save() : null)
        .then((author) => author ? author.view('full') : null)
        .then(success(res))
        .catch(next)
};

export const destroy = (req, res, next) => {
    const id = req.params.id;
    return Authors.findById(id)
        .then(notFound(res))
        .then((author) => author ? author.remove() : null)
        .then(success(res, 204))
        .catch(next)
};


// ---

export const searchByName = (req, res, next) => {
    const name = req.params.name;

    Authors.findOne({ "name" : { $regex: new RegExp(`${name}`, 'i') } },
        function (err, author) {
            if (!author)
                return notFound(res)(author);
            success(res)(author.view())
        })
};

export const searchByNationality = (req, res, next) => {

    const nationality = req.params.nationality;

    Authors.findOne({ "nationality" : { $regex: new RegExp(`${nationality}`, 'i') } },
        function (err, author) {
            if (!author)
                return notFound(res)(author);
            success(res)(author.view())
        })
};

export const searchByBirthday = (req, res, next) => {
    const min = new Date(req.params.min);
    const max = new Date(req.params.max);

    Authors.find({
        'birthday' : { $lte :  max, $gte :  min},
    })
        .then((authors) => authors.map((author) => author.view('full')))
        .then(success(res))
        .catch(next)
};

export const count = (req, res, next) => {
    Authors.count({})
        .then((count) => ({count: count}))
        .then(success(res))
        .catch(next)
};

export const listcount = (req, res, next) => {
    Promise.all([
        Authors.find({})
            .then((authors) => authors.map((author) => author.view())),
        Authors.count({})
    ]).then(([list, count]) => success(res)({list: list, count: count})).catch(next)
};

export const paginatedIndex = (req, res, next) => {
    // Call it as: http://localhost:9000/api/actors/index?limit=10&skip=1
    const limit = parseInt(req.query.limit) || 1000;
    const skip = parseInt(req.query.skip) || 0;

    return Authors.find()
        .limit(limit)
        .skip(skip)
        .sort({birthday: -1})
        .then((authors) => authors.map((author) => author.view('full')))
        .then(success(res))
        .catch(next)

};

export const moviesByActor = (req, res, next) => {
    const id = req.params.id;

    Authors.findById(id).exec(function (err, author) {
        // http://mongoosejs.com/docs/queries.html
        Books.find().where('author').in([author.id]).exec(function (err, books) {
            books = books.map((book) => book.view('list'));
            success(res)(books)
        });

        // Alternative form:
        // Books.find()
        //     .where('authors').in([author.id])
        //     .then((books) => movies.map((book) => book.view('list')))
        //     .then(success(res))
        //     .catch(next)
    });
};