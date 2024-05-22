document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/student-info');
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del estudiante');
        }

        const studentData = await response.json();
        document.getElementById('student-name').textContent = `${studentData.nombres} ${studentData.apellidos}`;
        
        const birthDate = new Date(studentData.fecha_nacimiento);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        document.getElementById('student-age').textContent = age;
        document.getElementById('student-grade').textContent = studentData.grado;
        document.getElementById('student-email').textContent = studentData.email;
    } catch (error) {
        console.error('Error al obtener los datos del estudiante:', error);
    }
});
