import React, { useEffect, useState, useContext } from 'react';
import PageHeader from "../components/PageHeader";
import api from "../axiosConfig";
import { UserContext } from "../App";

const PdfViewer = () => {
    const [pdfData, setPdfData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const {user} = useContext(UserContext);

    const downloadPDF = async (code) => {
        try {
            const response = await api.post("/verification/generatePdf", { code: code, output_path: "" })
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = window.URL.createObjectURL(blob);
            // window.open(fileURL);
            setPdfData(blob);
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        if (user.providerCode)
            downloadPDF(user.providerCode);
        else
            setErrorMessage("You don't have a prescriber code");
    }, []);

    return (
        <>
            <PageHeader
				title="Your PDF"
				desc="Here is your Prescription PDF."
			/>
            <div className="mx-4 my-4">
                {errorMessage && <p>{errorMessage}</p>}
                {pdfData && (
                    <iframe src={URL.createObjectURL(pdfData)} type="application/pdf" width="100%" height="600px" />
            )}
            </div>

        </>
    );
};

export default PdfViewer;
