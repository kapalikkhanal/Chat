'use client'
import { React } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { changeUserDetails } from '../../redux/reducerSlices/userSlice'
import { Menu, MenuButton, MenuList, MenuDivider } from '@chakra-ui/react'
import { logout } from '@/redux/reducerSlices/userSlice';
import { useRouter } from 'next/router'

export default function page() {
    const toast = useToast()
    const { userDetails } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const router = useRouter()

    const fetchUserDetails = async () => {
        const res = await fetch('http://localhost:3001/user/' + userDetails._id)
        const data = await res.json()
        console.log(res.status, data)
        // debugger;
        if (data) {
            dispatch(changeUserDetails(data.userDetails))
        }
        window.location.reload();
    }

    const editUsersDetails = async (values) => {
        const res = await fetch('http://localhost:3001/accountDetails/' + userDetails._id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        const data = await res.json()
        const status = await res.status

        if (status === 200) {
            fetchUserDetails()
        }
    }

    const handleSubmit = async (values) => {
        const res = await fetch('http://localhost:3001/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values) // We can Search for Status Code as Well
        })
    }

    return (
        <div>
            <body className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
                <div className='h-[15%] flex items-center justify-between'>
                    <h1 className='text-2xl text-white text-center font-semibold p-4'>CHAT Application</h1>
                    <div className='mr-10'>
                        <Menu width={'0px'} height={'50px'}>
                            <MenuButton
                                transition='all 0.1s'
                                borderRadius='full'
                                borderWidth='none'
                            >
                                <div className='flex justify-between space-x-5 ml-10'>
                                    <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring-2 ring-gray-300 dark:ring-gray-500">
                                        <svg className="absolute w-10 h-10 text-gray-400 -left-1" focusable="flase" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </MenuButton>
                            <MenuList bgColor={'gray.900'}>
                                <div className='flex flex-col justify-center '>
                                    <button onClick={() => router.push('/chatBox')} className='bg-gray-900 hover:bg-gray-800 p-2 text-white'>Back to Chat</button>
                                    <button
                                        onClick={() => {
                                            dispatch(logout());
                                            router.push('/');
                                        }}
                                        className='bg-gray-900 hover:bg-gray-800 p-2 text-white'
                                    >
                                        Logout
                                    </button>

                                </div>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
                    <div className="bg-white  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900">
                        <div className="p-6 space-y-4 md:space-y-6 ">

                            {/* Formik for Form Validation */}

                            <Formik
                                initialValues={userDetails}
                                onSubmit={(values, { resetForm }) => {
                                    // same shape as initial values
                                    editUsersDetails(values)
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

                                        {/* Email Address  */}
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-semibold font-small text-gray-900 dark:text-white">Email address</label>
                                            <Field name="email" type="email" className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue" />
                                            {errors.email && touched.email ? (
                                                <ErrorMessage name="email" component="div" className="sm:text-sm text-semibold font-small dark:text-red-600" />
                                            ) : null}
                                        </div>

                                        {/* Username  */}
                                        <div>
                                            <label htmlFor="userName" className="block mb-2 text-semibold font-small text-gray-900 dark:text-white">Username</label>
                                            <h1 className="border cursor-not-allowed border-gray-800 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue">
                                                {userDetails.userName}
                                            </h1>
                                        </div>
                                        <div className='flex justify-center space-x-8'>
                                            <button type="submit"
                                                className="w-full text-white bg-gray-800 hover:bg-[#2f4454] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                Update Details
                                            </button>
                                            <button type="button"
                                                onClick={() => { router.push('/chatBox') }}
                                                className="w-full text-white bg-gray-800 hover:bg-[#2f4454] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                Back
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div >
                </div >
            </body >
        </div >

    );
}
