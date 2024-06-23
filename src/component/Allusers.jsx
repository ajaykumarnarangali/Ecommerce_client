import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { Table } from 'flowbite-react';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import ChangeRole from './ChangeRole';

function Allusers() {

    const [allUsers, setAllusers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {

        const getUsers = async () => {
            try {
                const res = await fetch('/api/user/all-user');
                const data = await res.json();
                if (data.success == false) {
                    toast.error(data.message);
                    return;
                }
                setAllusers(data.users);
            } catch (error) {
                toast.error(error.message);
            }
        }

        getUsers()

    }, [])

    return (
        <div className='w-full h-full overflow-y-auto'>
            <Table hoverable className='cursor-pointer'>
                <Table.Head>
                    <Table.HeadCell>No</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                    <Table.HeadCell>Created at</Table.HeadCell>
                    <Table.HeadCell>Change role</Table.HeadCell>
                </Table.Head>
                {
                    allUsers.length > 0 &&
                    allUsers.map((user, index) => (
                        <Table.Body key={user._id}>
                            <Table.Row>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.isAdmin ? 'Admin' : 'User'}</Table.Cell>
                                <Table.Cell>{moment(user.createdAt).format('LL')}</Table.Cell>
                                <Table.Cell>
                                    <MdModeEdit className='ms-10'
                                        onClick={() => {
                                            setOpenModal(true)
                                            setUser(user)
                                        }} />
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))
                }
            </Table>

            <ChangeRole setOpenModal={setOpenModal} openModal={openModal} user={user} setAllusers={setAllusers} />
        </div>
    )
}

export default Allusers
