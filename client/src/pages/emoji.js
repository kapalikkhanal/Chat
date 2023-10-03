import React, { useState } from 'react';
import Picker from 'emoji-mart';

export default function EmojiInputWithPicker() {
    const [messageText, setMessageText] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const handleInputChange = (e) => {
        setMessageText(e.target.value);
    };

    const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji);
    };

    const handleTogglePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleSendClick = () => {
        const combinedMessage = `${messageText} ${selectedEmoji ? selectedEmoji.native : ''}`;
        console.log('Combined Message:', combinedMessage);
        setMessageText('');
        setSelectedEmoji(null);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Type your message..."
                value={messageText}
                onChange={handleInputChange}
            />
            <button onClick={handleTogglePicker}>Toggle Emoji Picker</button>
            {showPicker && (
                <div>
                    <Picker onEmojiSelect={handleEmojiSelect} />
                </div>
            )}
            <button onClick={handleSendClick}>Send</button>
        </div>
    );
}
