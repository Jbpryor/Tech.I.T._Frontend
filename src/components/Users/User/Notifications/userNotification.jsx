function UserNotifications({ theme, notificationsActive}) {
    return (
        <div className={`user-notifications-container ${notificationsActive ? 'active' : ''}`}>
            <div className="notifications-content">
                <div className="notifications-global" style={{ background: theme.primary_color, border: `2px solid ${theme.border}` }} >
                    <div className="notification-content">
                        <div className="notification-title">All Notifications</div>
                        <div className="notification-button-container">
                            <button className="enable">Enable</button>
                            <button className="disable">Disable</button>
                        </div>
                    </div>
                    <div className="notification-content">
                        <div className="notification-title">Notification bell icon</div>
                        <div className="notification-button-container">
                            <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                            <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                        </div>
                    </div>
                </div>
                <div className="notifications-local" style={{ background: theme.primary_color, border: `2px solid ${theme.border}` }} >
                    <div className="notification-header">Notify me when:</div>
                    <div className="notifications">
                        <div className="notification-content">
                            <div className="notification-title">new project added</div>
                            <div className="notification-button-container">
                                <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                            </div>
                        </div>
                        <div className="notification-content">
                            <div className="notification-title">new issue added</div>
                            <div className="notification-button-container">
                                <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                            </div>
                        </div>
                        <div className="notification-content">
                            <div className="notification-title">new user added</div>
                            <div className="notification-button-container">
                                <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                            </div>
                        </div>
                        <div className="notification-content">
                            <div className="notification-title">new report added</div>
                            <div className="notification-button-container">
                                <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                            </div>
                        </div>
                        <div className="notification-content">
                            <div className="notification-title">issue closed</div>
                            <div className="notification-button-container">
                                <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                            </div>
                        </div>
                        <div className="notification-content">
                            <div className="notification-title">issue status change</div>
                            <div className="notification-button-container">
                                <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                            </div>
                        </div>
                        <div className="notification-content">
                            <div className="notification-title">issue is commented</div>
                            <div className="notification-button-container">
                                <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                            </div>
                        </div>
                        <div className="notification-content">
                            <div className="notification-title">issue attachment is added</div>
                            <div className="notification-button-container">
                                <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                            </div>
                        </div>
                        <div className="notification-content">
                            <div className="notification-title">user role change</div>
                            <div className="notification-button-container">
                                <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                            </div>
                        </div>

                        <div className="notification-save-button-container">
                            <button className="notifications-save-button" style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }} >Save Changes</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserNotifications;