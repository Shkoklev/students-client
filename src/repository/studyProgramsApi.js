export const getStudyPrograms = () => {
    return fetch('http://localhost:8080/study_programs');
};

export const getStudyProgramById = (id) => {
    return fetch(`http://localhost:8080/study_programs/${id}`)
}

export const updateStudyProgram = (studyProgram) => {

    return fetch(`http://localhost:8080/study_programs/${studyProgram.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name: studyProgram.name,
        })
    });
};

export const addStudyProgram = (studyProgram) => {
    return fetch('http://localhost:8080/study_programs', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name: studyProgram.name
        })
    });
};

export const deleteStudyProgramById = (id) => {
    return fetch(`http://localhost:8080/study_programs/${id}`, {
        method: 'DELETE'
    });

};