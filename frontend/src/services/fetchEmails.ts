import axios from "axios";

export const fetchEmails = async (page: number, limit: number) => {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}?page=${page}&limit=${limit}`);
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&limit=${limit}`
    );
    console.log(res.data);
    return res.data;
};


