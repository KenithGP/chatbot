let studentData = {};

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/student-info');
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del estudiante');
        }

        studentData = await response.json();
        document.getElementById('student-name').textContent = `${studentData.nombres} ${studentData.apellidos}`;
        
        const birthDate = new Date(studentData.fecha_nacimiento);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        document.getElementById('student-age').textContent = age;
        document.getElementById('student-grade').textContent = studentData.grado;
        document.getElementById('student-email').textContent = studentData.email;

        document.querySelectorAll('.course').forEach(courseElement => {
            const courseName = courseElement.getAttribute('data-course');
            loadTopics(courseName, courseElement);
        });
        
        async function loadTopics(courseName, courseElement) {
            try {
                const response = await fetch(`/topics?course=${encodeURIComponent(courseName)}`);
                if (!response.ok) {
                    throw new Error('No se pudieron obtener los temas del curso');
                }

                const topics = await response.json();
                console.log(topics);

                let selectElement = courseElement.querySelector('.topics-menu');
                if (!selectElement) {
                    selectElement = document.createElement('select');
                    selectElement.classList.add('topics-menu');
                    courseElement.appendChild(selectElement);
                } else {
                    selectElement.innerHTML = '';
                }

                topics.forEach(topic => {
                    const option = document.createElement('option');
                    option.value = topic.titulo;
                    option.textContent = topic.titulo;
                    selectElement.appendChild(option);
                });

                selectElement.addEventListener('change', function() {
                    const selectedTema = this.value;
                    const selectedGrade = studentData.grado;
                    window.location.href = `/chat?Grado=${selectedGrade}&Tema=${selectedTema}`;
                });

            } catch (error) {
                console.error('Error al obtener los temas: ', error);
            }
        }

    } catch (error) {
        console.error('Error al obtener los datos del estudiante:', error);
    }
});
