function UserPassword({ theme, passwordActive }) {
    return (
        <div className={`user-password-container ${passwordActive ? 'active' : ''}`} >
            <div className="user-password-content" style={{ background: theme.primary_color, color: theme.font_color, border: `2px solid ${theme.border}` }}>

                <div className="title-container">
                    <div className="title-content">
                        <div className="title">Change Password</div>
                        <div className="password-details">Update your password regularly and make sure it is unique from other passwords you use.</div>
                    </div>
                    <div className="password-icon">
                        <i className='bx bxs-lock'></i>
                    </div>
                </div>

                <div className="password-content">
                    <div className="current-password">
                        <div className="title">Current Password*</div>
                        <input type="password" style={{ background: theme.background_color, color: theme.font_color }} />
                    </div>
                    <div className="new-password">
                        <div className="title">New Password*</div>
                        <input type="password" style={{ background: theme.background_color, color: theme.font_color }} />
                    </div>
                    <div className="re-enter-password">
                        <div className="title">Re-enter New Password*</div>
                        <input type="password" style={{ background: theme.background_color, color: theme.font_color }} />
                    </div>
                </div>

                <div className="new-password-button-container">
                    <button className="new-password-submit-button" style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }} >Submit</button>
                </div>

            </div>
        </div>
    )
}

export default UserPassword;