export const listStudents = () => {
    return [
        {
            firstName: 'Dimitri',
            lastName: 'Shkoklev',
            index: '161179',
            studyProgram: 'Computer Sciences and Engineering'
        },
        {
            firstName: 'Marko',
            lastName: 'Markovski',
            index: '163052',
            studyProgram: 'Application of Information Technologies'
        },
        {
            firstName: 'Ivan',
            lastName: 'Jovanov',
            index: '152017',
            studyProgram: 'Networking Technologies'
        },
        {
            firstName: 'Marija',
            lastName: 'Ivanovska',
            index: '161106',
            studyProgram: 'Computer Sciences and Engineering'
        },
        {
            firstName: 'Monika',
            lastName: 'Ognenovska',
            index: '163095',
            studyProgram: 'Application of Information Technologies'
        },
        {
            firstName: 'Martin',
            lastName: 'Serafimovski',
            index: '142105',
            studyProgram: 'Networking Technologies'
        },
        {
            firstName: 'Petar',
            lastName: 'Kostov',
            index: '131112',
            studyProgram: 'Networking Technologies'
        },
        {
            firstName: 'Jovana',
            lastName: 'Stojanoska',
            index: '1630988',
            studyProgram: 'Application of Information Technologies'
        }
    ];
};

export const cloneStudents = (state) => {
    const newStudentsArrayRef = [
        ...state.students
    ];

    return newStudentsArrayRef;
}