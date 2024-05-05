import vine from "@vinejs/vine"

export const schema = vine.object({
    username: vine.string().minLength(3),
    password: vine
        .string()
        .minLength(8)
        .maxLength(32)
        .confirmed()
})
