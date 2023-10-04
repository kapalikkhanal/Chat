
import React from 'react'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const friendSchema = Yup.object().shape({
    friendName: Yup.string()
        .required('Required'),
});

const addFriend = () => {
    const handleSubmit = async (values) => {
        const res = await fetch('http://localhost:3001/addFriend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values) // We can Search for Status Code as Well
        })
    }
    return (
        <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href="/" className="flex items-center mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
                    Chat
                </Link>
                <div className="w-full bg-white  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Formik
                            initialValues={{
                                friendName: '',
                            }}
                            validationSchema={friendSchema}
                            onSubmit={(values, { resetForm }) => {
                                // same shape as initial values
                                handleSubmit(values);
                                resetForm({ values: '' })
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className="space-y-4 md:space-y-6">
                                    {/* Add Friend  */}
                                    <div>
                                        <label for="friendName" className="block mb-2 text-semibold font-small text-gray-900 dark:text-white">Add Friend</label>
                                        <Field name="friendName" type="text" className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue" />
                                        {errors.friendName && touched.friendName ? (
                                            <ErrorMessage name="friendName" component="div" className="sm:text-sm text-semibold font-small dark:text-red-600" />
                                        ) : null}
                                    </div>

                                    {/* Create an account button  */}
                                    <button type="submit" onSubmit={values => { handleSubmit(values); }} className="w-full text-white bg-gray-800 hover:bg-[#2f4454] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">+ Add</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default addFriend
