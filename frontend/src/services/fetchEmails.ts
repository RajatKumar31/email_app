import axios from "axios";

export const fetchEmails = async (page: number, limit: number) => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&limit=${limit}`
    );
    return res.data;
};


