class VotingSystem {
  isEligibleToVote(age) {
    return age >= 18;
  }
}

export default VotingSystem;

// here we export the class VotingSystem as default export
// so we can import this class with any name in another file.