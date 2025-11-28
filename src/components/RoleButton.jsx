import React from 'react'

function RoleButton({ role, title, setRole }) {
    const ChangeRole = () => {
        setRole(role)
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 w-1/3 bg-white bg-opacity-30 backdrop-blur-sm rounded-xl shadow-lg hover:bg-opacity-50 transition duration-200 border border-white border-opacity-30">
            <button
                onClick={() => ChangeRole(`${role}`)}
            >
                <span className="text-2xl text-white mb-1">
                    <i className="fas fa-user-tie"></i>
                </span>
                <span className="text-sm text-black font-semibold">{role}</span><br />
                <span className="text-sm text-black font-semibold">{title}</span>
            </button>
        </div>
    )
}

export default RoleButton
