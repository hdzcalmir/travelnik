import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IReview } from '@/common/interfaces/IReview';
import useReviews from '@/hooks/useReviews';


interface ReviewDetailsModalProps {
    data: IReview;
    toggleModal: () => void;
}

const ReviewDetailsModal: React.FC<ReviewDetailsModalProps> = ({ data, toggleModal }) => {

    const { updateUnapprovedReviewMutation } = useReviews();

    const id = data.id;

    const handleApproveReview = async (e: React.FormEvent<HTMLFormElement>) => {
        toggleModal();
        e.preventDefault();
        await updateUnapprovedReviewMutation.mutateAsync({ id, status: true });
    };

    return (
        <>
            <div
                className="fixed top-0 z-50 left-0 w-full h-full bg-black opacity-50"
                onClick={() => {
                    toggleModal();
                }}
            ></div>
            <div
                id="crud-modal"
                aria-hidden="true"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 w-full lg:w-2/5 p-4 md:p-5"
            >
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Review from: <span className="font-medium text-gray-500 mr-2"> {data.name}</span>
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="crud-modal"
                            onClick={() => {
                                toggleModal();
                            }}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={handleApproveReview}
                        className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-1">
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Name</label>
                                <input
                                    name="name"
                                    defaultValue={data.name}
                                    disabled
                                    className="appearance-none rounded-lg bg-gray-700 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Venture name"
                                />
                            </div>
                            <div className="flex justify-between w-full  px-5">
                                <label className="text-md text-gray-50">Description</label>
                                <textarea
                                    name="description"
                                    rows={10}
                                    defaultValue={data.text}
                                    disabled
                                    className="appearance-none rounded-lg resize-none bg-gray-700 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                                    placeholder="Review description"
                                />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Rating</label>
                                <div className='flex text-white text-2xl'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    {data.rate}
                                </div>
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Entity ID</label>
                                <input
                                    value={data.entity_id}
                                    disabled
                                    name="city"
                                    className="appearance-none rounded-lg bg-gray-700 border-none w-2/3 text-gray-400 py-3 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Venture description"
                                />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Type</label>
                                <input
                                    value={data.entity_type.charAt(0).toUpperCase() + data.entity_type.slice(1)}
                                    disabled
                                    name="city"
                                    className="appearance-none rounded-lg bg-gray-700 border-none w-2/3 text-gray-400 py-3 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Venture description"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <button
                                className="text-white inline-flex items-center bg-transparentBtn hover:bg-hoverBtn focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
                                onClick={() => {
                                    toggleModal();
                                }}
                            >
                                <span className="mr-2">Cancel</span>
                                <MdCancel className="text-[16px] text-red-500" />
                            </button>
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-transparentBtn hover:bg-hoverBtn focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
                            >
                                <span className="mr-2">Approve</span>
                                <FaCheckCircle className="text-[16px] text-green-500" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ReviewDetailsModal;
