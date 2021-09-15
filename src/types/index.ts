type userTokenPayload = {
    id: number,
    displayName: string,
    email: string,
    phoneNumber: string
}

type emailTokenPayload = {
    email: string,
    type: string 
}

type requestQueryPagination = {
    f?: string,
    s?: string,
    page?: string,
    limit?: string

}
export {
    userTokenPayload,
    emailTokenPayload,
    requestQueryPagination
}