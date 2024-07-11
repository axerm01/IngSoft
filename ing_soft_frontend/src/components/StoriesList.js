import React from 'react';

const StoriesList = ({ stories }) => {
    if (!stories.length) {
        return <div style={{ textAlign: 'center', marginTop: '20px', color: "white" }}>No items found</div>;
    }

    return (
        <div>
            {stories.map((story) => (
                <div key={story.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                    <h3>{story.title}</h3>
                    <p> Creata il {new Date(story.creationDate).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default StoriesList;
