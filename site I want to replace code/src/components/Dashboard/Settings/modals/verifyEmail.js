import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import '../settings.css';

export default function VerifyEmail({closeVerifyEmailModal}){
    return(
        <div className="phone-settings-container">
            <div className="phone-settings" style={{display: 'flex'}}>
                <ErrorOutlineIcon style={{color: '#F44336', marginTop: '18px', marginLeft: '10px'}}/>
                <form>
                    <h2 style={{paddingBottom: '15px'}}>Check your inbox</h2>
                    <h3>A verification link has been sent to your email.</h3>
                    <div className="but">
                        <button className="but2" onClick={() => closeVerifyEmailModal()}>Got it</button>
                    </div>
                </form>
            </div>
        </div>
    )
} 