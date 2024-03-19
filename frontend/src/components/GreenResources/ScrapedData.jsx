import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScrapedData = (websiteURL) => {
    const [data, setData] = useState('');
    const [noFoundDescription, setNoFoundDescription] = useState(false);
    const [foundDescription, setFoundDescription] = useState(false);
    // console.log("HMMMM: ", websiteURL)
    const { websiteUrl } = JSON.parse(JSON.stringify(websiteURL));
    console.log("WEBBBB:", websiteUrl);
    
    const get_api = `http://127.0.0.1:5002/call-python-function?websiteURL=${websiteUrl}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(get_api);
                if ((response.data['text'] === "No description found, but you can visit this website for more information:")) {
                    setData(response.data['text'])
                    setFoundDescription(false);
                }
                else {
                    setData(response.data['text']);
                    setFoundDescription(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [websiteURL]);

    useEffect(() => {
        setData('No Description Found');
        setFoundDescription(false)
    }, [websiteURL]);

    // useEffect(() => {
    //     setFoundDescription(true)
    // }, [websiteURL, foundDescription]);


    return (
        <div>
            <p>{data}</p>
            {foundDescription && <p className='pt-5'>Feel free to visit this website for more information:</p>}
            <a href={websiteUrl} target="_blank" className="text-blue-600 hover:underline pb-10 text-m break-words">{websiteUrl}</a>
        </div>
    );
};

export default ScrapedData;
