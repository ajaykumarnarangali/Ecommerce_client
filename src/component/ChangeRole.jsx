import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";

function ChangeRole({ openModal, setOpenModal, user,setAllusers }) {

    const [role, setRole] = useState('User');

    const handleChangeRole = async () => {
        try {
            const res=await fetch(`/api/user/change-role/${user._id}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({role})
            })
            const data=await res.json();

            if(data.success===false){
                toast.error(data.message);
                return
            }

            setAllusers(prev=>{
               return prev.map((each)=>{
                return each._id==user._id?data.user:each
               })
            });

            setOpenModal(false);
        } catch (error) {
           toast.error(error.message)
        }
    }

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Terms of Service</Modal.Header>
            <Modal.Body>
                <form className="flex flex-col p-5 gap-5">
                    <p>username:{user?.username}</p>
                    <p>email:{user?.email}</p>
                    <select onChange={(e) => { setRole(e.target.value) }} value={user?.isAdmin ? 'Admin' : 'User'}>
                        <option value={'Admin'}>Admin</option>
                        <option value={'User'}>User</option>
                    </select>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleChangeRole}>I accept</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                    Decline
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangeRole
