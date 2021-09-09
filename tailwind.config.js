const plugin = require('tailwindcss/plugin')

module.exports = {
    purge: [],
    darkMode: false,
    theme: {
        typography: {
            default: {
                css: {
                    'code::before': {
                        content: '""',
                    },
                    'code::after': {
                        content: '""',
                    },
                },
            },
        },
        extend: {
            animation: {
                'float': 'float 4s 4s ease-in-out infinite',
                'driftLeft': 'driftLeft 4s ease-in-out infinite alternate',
                'driftRight': 'driftRight 4s ease-in-out infinite alternate',
                'driftUp': 'driftUp 4s ease-in-out infinite alternate',
                'driftDown': 'driftDown 4s ease-in-out infinite alternate',
                'driftUpLeft': 'driftUpLeft 4s ease-in-out infinite alternate',
                'driftDownLeft': 'driftDownLeft 4s ease-in-out infinite alternate',
                'driftUpRight': 'driftUpRight 4s ease-in-out infinite alternate',
                'driftDownRight': 'driftDownRight 4s ease-in-out infinite alternate',
            },
            keyframes: {
                driftLeft: {
                    '0%': { transform: 'translateX(100%)',
                        opacity: '0'
                    },
                    '50%': {
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'translateX(-100%)',
                        opacity: '0'
                    },
                },

                driftRight: {
                    '0%': { transform: 'translateX(-100%)',
                        opacity: '0'
                    },
                    '50%': {
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'translateX(100%)',
                        opacity: '0'
                    },
                },

                driftUp: {
                    '0%': { transform: 'translateY(100%)',
                        opacity: '0'
                    },
                    '50%': {
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'translateY(-100%)',
                        opacity: '0'
                    },
                },

                driftDown: {
                    '0%': { transform: 'translateY(-100%)',
                        opacity: '0'
                    },
                    '50%': {
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'translateY(100%)',
                        opacity: '0'
                    },
                },

                driftUpLeft: {
                    '0%': { transform: 'translateX(100%) translateY(100%)',
                        opacity: '0'
                    },
                    '50%': {
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'translateX(-100%) translateY(-100%)',
                        opacity: '0'
                    },
                },

                driftDownLeft: {
                    '0%': { transform: 'translateX(100%) translateY(-100%)',
                        opacity: '0'
                    },
                    '50%': {
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'translateX(-100%) translateY(100%)',
                        opacity: '0'
                    },
                },

                driftUpRight: {
                    '0%': { transform: 'translateX(-100%) translateY(100%)',
                        opacity: '0'
                    },
                    '50%': {
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'translateX(100%) translateY(-100%)',
                        opacity: '0'
                    },
                },

                driftDownRight: {
                    '0%': { transform: 'translateX(-100%) translateY(-100%)',
                        opacity: '0'
                    },
                    '50%': {
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'translateX(100%) translateY(100%)',
                        opacity: '0'
                    },
                },

                float: {
                    '0%': {
                        transform: 'translateY(0px)'
                    },
                    '50%': {
                        transform: 'translateY(-10px)'
                    },
                    '100%': {
                        transform: 'translateY(0px)'
                    }
                }
            },
            screens: {
                'print': {'raw': 'print'}
            }
        },
    },
    variants: {
        animation: ['responsive', 'motion-safe', 'motion-reduce'],
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography")
    ]
}
