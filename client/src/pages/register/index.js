'use client'
import { React } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image'
import Link from 'next/link';
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

//Material UI Import

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short')
        .max(50, 'Too Long')
        .required('Required'),

    lastName: Yup.string()
        .min(2, 'Too Short')
        .max(50, 'Too Long')
        .required('Required'),

    password: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('Required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Must match "password" field value')
        .required('Required'),

    email: Yup.string().email('Invalid email').required('Required'),

    userName: Yup.string(),

    terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions.'),
});

export default function page() {
    const toast = useToast()
    const router = useRouter()

    const handleSubmit = async (values) => {
        const res = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values) // We can Search for Status Code as Well
        })
        const data = await res.json()
        const status = await res.status
        console.log(data, status)
        if (status === 200) {
            console.log("At 200")
            toast({
                title: data.msg,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            })
            router.push('/')
        }

        else if (status === 409) {
            toast({
                title: data.msg,
                status: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            })
        }
    }
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-100vh lg:py-0">
                    <Link href="/" className="flex items-center mt-10 text-2xl font-semibold text-gray-900 dark:text-white">
                        Chat
                    </Link>
                    <div className="w-full bg-white  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900">
                        <div className="p-6 space-y-4 md:space-y-6 ">
                            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>

                            {/* Formik for Form Validation */}

                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                    userName: '',
                                    terms: false,
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={(values, { resetForm }) => {
                                    // same shape as initial values
                                    const randomNumbers = Math.floor(Math.random() * 100000);
                                    values.userName = `${values.firstName}${randomNumbers}`;
                                    console.log("Values are:", values);
                                    handleSubmit(values);
                                    resetForm({ values: '' })
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form className="space-y-4 md:space-y-6">
                                        {/* First and Last Name */}
                                        <div className='flex justify-between space-x-5'>
                                            {/* First Name  */}
                                            <div>
                                                <label htmlFor="firstName" className="block mb-2 text-semibold font-small dark:text-white">First Name</label>
                                                <Field name="firstName" className="border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue" />
                                                {errors.firstName && touched.firstName ? (
                                                    <ErrorMessage name="firstName" component="div" className="sm:text-sm text-semibold font-small dark:text-red-600" />
                                                ) : null}
                                            </div>
                                            {/* Last Name  */}
                                            <div>
                                                <label htmlFor="lastName" className="block mb-2 text-semibold font-small text-gray-900 dark:text-white">Last Name</label>
                                                <Field name="lastName" className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue" />
                                                {errors.lastName && touched.lastName ? (
                                                    <ErrorMessage name="lastName" component="div" className="sm:text-sm text-semibold font-small dark:text-red-600" />
                                                ) : null}
                                            </div>
                                        </div>

                                        {/* Country Name */}

                                        {/* <div>
                                            <label htmlFor="countryName" className="block mb-2 text-semibold font-small text-gray-900 dark:text-white">Country</label>
                                            <Demo />
                                        </div> */}



                                        {/* Email Address  */}
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-semibold font-small text-gray-900 dark:text-white">Email address</label>
                                            <Field name="email" type="email" className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue" />
                                            {errors.email && touched.email ? (
                                                <ErrorMessage name="email" component="div" className="sm:text-sm text-semibold font-small dark:text-red-600" />
                                            ) : null}
                                        </div>

                                        <div className='flex justify-between space-x-5'>
                                            {/* Password  */}
                                            <div>
                                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <Field name="password" type="password" className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                {errors.password && touched.password ? (
                                                    <ErrorMessage name="password" component="div" className="sm:text-sm text-semibold font-small dark:text-red-600" />
                                                ) : null}
                                            </div>
                                            {/* Password  */}
                                            <div>
                                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                                <Field name="confirmPassword" type="password" className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                {errors.confirmPassword && touched.confirmPassword ? (
                                                    <ErrorMessage name="confirmPassword" component="div" className="sm:text-sm text-semibold font-small dark:text-red-600" />
                                                ) : null}
                                            </div>
                                        </div>

                                        {/* Create an account button  */}
                                        <div className="flex items-start">
                                            {/* Terms and Conditions */}
                                            <div>
                                                <Field name="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</Link></label>
                                                {errors.terms && touched.terms ? (
                                                    <ErrorMessage name="terms" component="div" className="sm:text-sm text-semibold font-small dark:text-red-600" />
                                                ) : null}
                                            </div>
                                            {/* Terms and Conditions */}
                                        </div>
                                        <button type="submit" className="w-full text-white bg-gray-800 hover:bg-[#2f4454] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                        <p className="text-sm font-light text-gray-300 dark:text-gray-200">
                                            Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-red-500"> &nbsp;Sign in</Link>
                                        </p>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}
