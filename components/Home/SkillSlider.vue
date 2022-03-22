<template>
    <div class="slider animate__animated animate__fadeInRight animate__delay-3s">
        <div class="slide-track">
            <div class="slide" v-for="(skill, skillIndex) in sort(skills)" :key="skillIndex">
                <img height="80" width="80" :src="require(`static/images/skills/${skill.thumbnail}`)" :alt="skill.name" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SkillSlider",
    data() {
        return {
            skills: [
                {
                    "name": "HTML5",
                    "thumbnail": "html5.webp"
                },
                {
                    "name": "CSS3/SASS",
                    "thumbnail": "css3.png"
                },
                {
                    "name": "SASS",
                    "thumbnail": "sass.png"
                },
                {
                    "name": "JavaScript/ES6",
                    "thumbnail": "js.png"
                },
                {
                    "name": "PHP",
                    "thumbnail": "php.png"
                },
                {
                    "name": "Python",
                    "thumbnail": "python.png"
                },
                {
                    "name": "MySQL/MariaDB",
                    "thumbnail": "mysql.png"
                },
                {
                    "name": "PostgreSQL",
                    "thumbnail": "pgsql.png"
                },
                {
                    "name": "Supabase",
                    "thumbnail": "supabase.png"
                },
                {
                    "name": "Vue",
                    "thumbnail": "vue.png"
                },
                {
                    "name": "React",
                    "thumbnail": "react.png"
                },
                {
                    "name": "Alpine",
                    "thumbnail": "alpine.png"
                },
                {
                    "name": "Bootstrap",
                    "thumbnail": "bootstrap.png"
                },
                {
                    "name": "Vuetify",
                    "thumbnail": "vuetify.png"
                },
                {
                    "name": "Laravel",
                    "thumbnail": "laravel.png"
                },
                {
                    "name": "Symfony",
                    "thumbnail": "symfony.png"
                },
                {
                    "name": "Django",
                    "thumbnail": "django.png"
                },
                {
                    "name": "Jest",
                    "thumbnail": "jest.png"
                },
                {
                    "name": "Cypress",
                    "thumbnail": "cypress.png"
                },
                {
                    "name": "GitHub",
                    "thumbnail": "github.png"
                },
                {
                    "name": "GitLab",
                    "thumbnail": "gitlab.svg"
                },
                {
                    "name": "AWS-EC2/S3",
                    "thumbnail": "ec2.svg"
                },
                {
                    "name": "Heroku",
                    "thumbnail": "heroku.webp"
                },
                {
                    "name": "Docker",
                    "thumbnail": "docker.webp"
                },
                {
                    "name": "WordPress",
                    "thumbnail": "wp.png"
                }
            ]
        }
    },
    methods: {
        sort(array) {
            return array.sort(() => Math.random() - 0.5)
        }
    },
}
</script>

<style lang="scss">
@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-250px * 7))}
}

.slider {
    background: transparent;
    height: 100px;
    margin: 48px auto auto auto;
    overflow:hidden;
    position: relative;

    &::before,
    &::after {
        content: "";
        height: 100px;
        position: absolute;
        width: 200px;
        z-index: 2;
    }

    &::after {
        right: 0;
        top: 0;
        transform: rotateZ(180deg);
    }

    &::before {
        left: 0;
        top: 0;
    }

    .slide-track {
        height: 100px;
        animation: scroll 30s linear infinite;
        animation-direction: alternate;
        display: flex;
        width: calc(250px * 14);
    }

    .slide {
        padding-top: 8px;
        margin-right: 32px;
        height: 80px;
        width: 80px;
        z-index: 999;
    }
}
</style>