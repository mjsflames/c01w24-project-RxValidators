import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScrapedData = (websiteURL) => {
    const [data, setData] = useState('');
    // console.log("HMMMM: ", websiteURL)
    const { websiteUrl } = JSON.parse(JSON.stringify(websiteURL));
    
    const get_api = `http://127.0.0.1:5000/call-python-function?websiteURL=${websiteUrl}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(get_api);
                setData(response.data['text']);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [websiteURL]);

    return (
        <div>
            <p>{data}</p>
        </div>
    );
};

export default ScrapedData;
