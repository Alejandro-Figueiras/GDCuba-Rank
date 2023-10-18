import express from 'express'

export const middlewaresConfig = app => {
    app.use(express.urlencoded({extended:false}))
    app.use(express.json());
}