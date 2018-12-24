export const getAllStudents = () => {
    return fetch('http://localhost:8080/students');
};

export const getStudentByIndex = (index) => {
    return fetch(`http://localhost:8080/students/${index}`);
};

export const getStudentsByStudyProgram = (id) => {
    return fetch(`http://localhost:8080/students/by_study_program/${id}`);
};

export const deleteStudent = (index) => {
    return fetch(`http://localhost:8080/students/${index}`, {
        method: 'DELETE'
    });

};

export const updateStudent = (student) => {
    return fetch(`http://localhost:8080/students/${student.index}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name: student.name,
            lastName: student.lastName,
            studyProgramName: student.studyProgramName
        })
    });
};

export const addStudent = (student) => {
    return fetch('http://localhost:8080/students', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            index: student.index,
            name: student.name,
            lastName: student.lastName,
            studyProgramName: student.studyProgramName
        })
    });
};