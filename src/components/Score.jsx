import React from 'react'

const Score = ({score, size}) => {
    let bg = {
        color: 'rgb(100 116 139)',
        bg: 'rgb(100 116 139)',
    }

    let sz = '10px';

    if (score > 0) {
        bg.color = 'rgb(255 0 0)';
        bg.bg = 'rgb(86 13 13)';
    }

    if (score > 30) {
        bg.color = 'rgb(251 191 36)';
        bg.bg = 'rgb(120 53 15)';
    }

    if (score > 40) {
        bg.color = 'rgb(245 158 11)';
        bg.bg = 'rgb(120 53 15)';
    }

    if (score > 50) {
        bg.color = 'rgb(132 204 22)';
        bg.bg = 'rgb(54 83 20)';
    }

    if (score > 70) {
        bg.color = 'rgb(34 197 94)';
        bg.bg = 'rgb(20 83 45)';
    }

    if (score > 90) {
        bg.color = 'rgb(14 165 233)';
        bg.bg = 'rgb(12 74 110)';
    }

    if(size === 'md') sz="11px";
    if(size === 'lg') sz="14px";
    if(size === 'xl') sz="16px";

    return (
        <div className="score" style={{fontSize : sz}}>
            <div className="score-rate"  style={{background: `conic-gradient( ${bg.color} ${score}%, ${bg.bg} 0)`}}></div>
            <div className="score__inner">
            {score}<span>%</span>
            </div>
        </div>
    )
}

export default Score