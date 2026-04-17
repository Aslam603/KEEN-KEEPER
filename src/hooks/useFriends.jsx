import { useEffect, useState } from 'react'; // Fixed: Removed double import

const UseFriends = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/friends.json");
                const data = await res.json();
                setTimeout(() => {
                    setFriends(data);
                    setLoading(false);
                }, 1500);
            } catch (error) {
                console.error("Error fetching friends:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { friends, loading };
};

export default UseFriends;