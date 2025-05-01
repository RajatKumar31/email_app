import axios from "axios";

interface EmailData {
    to: string;
    subject: string;
    body: string;
    scheduledAt: string | null;
}

export const fetchEmails = async (page: number, limit: number) => {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}?page=${page}&limit=${limit}`);
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&limit=${limit}`
    );
    console.log(res.data);
    return res.data;
};


export const sendOrScheduleEmail = async (emailData: EmailData) => {
    const endpoint = emailData.scheduledAt
        ? "/schedule"
        : "/send";

    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        emailData
    );

    return res.data;
};
