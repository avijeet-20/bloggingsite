import { z } from "zod"

const signupInput = z.object({
    email:z.string().email(),
    name:z.string(),
    password:z.string()
})

type signupType = z.infer<typeof signupInput>

const siginInput = z.object({
    email:z.string().email(),
    password:z.string()
})

type signinType = z.infer<typeof siginInput>

const createPostInput = z.object({
    title:z.string(),
    content:z.string(),
})

type createPostType = z.infer<typeof createPostInput>


const updatePostInput = z.object({
    title:z.string().optional(),
    content:z.string().optional()
})

type updatePostType = z.infer<typeof updatePostInput>

export {
    signupInput,
    signupType,
    siginInput,
    signinType,
    createPostInput,
    createPostType,
    updatePostInput,
    updatePostType
}

