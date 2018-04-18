import {notFound, success} from '../../services/response/'
import Books from "./model";

const populateOpt = {
    path: 'authors',
    model: 'Author',
    select: 'id name'
};

export const index = (req, res, next) => {
    return Books.find()
        .then((books) => books.map((book) => book.view()))
        .then(success(res))
        .catch(next)
};

export const show = (req, res, next) => {
    const id = req.params.id;
    return Books.findById(id)
        .populate(populateOpt)
        .then((book) => book ? book.view('full') : null)
        .then(success(res))
        .catch(notFound(res))
};


export const create = (req, res, next) => {
    const body = req.body;

    Books.create(body)
        // .then((book) => Books.populate(book, populateOpt))
        .then((book) => book.view('full'))
        .then(success(res))
        .catch(next)
};