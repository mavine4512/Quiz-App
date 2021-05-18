
// we dont want answer to be in the same position
export const shuffleArray=(array:any[])=>[...array].sort(()=>Math.random()-0.5);
