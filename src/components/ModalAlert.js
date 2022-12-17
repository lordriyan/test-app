export default function ModalAlert({ title, message, button, show }) {

    if (!show) return null;

    return <div className="fixed top-0 z-[60] px-11 left-0 w-screen h-screen flex justify-center items-center">
        <div className="bg-white w-full sm:w-96 shadow-2xl flex flex-col items-center p-3 rounded gap-1">
            <div className="my-4 w-full text-center font-semibold text-lg">
                <div>
                    {title}
                </div>
                <div>
                    {message}
                </div>
            </div>
            <div className="w-full">
                {button}
            </div>
        </div>
    </div>
}