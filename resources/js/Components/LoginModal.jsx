import Modal from "./Modal";

export default function LoginModal({ open = true })
{
    return (
        <Modal
            show={open}
            title="Hola"
        >
            <p>Hola</p>   
        </Modal>
    );
}