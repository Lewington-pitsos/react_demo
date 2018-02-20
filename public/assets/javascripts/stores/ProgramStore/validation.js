import bucketsStore from '../BucketsStore'

export default {
  validateCommands() {
    // gets an array of all the ids of all the commands
    // confirms that all existing command successors either refer to ids in that list or are falsey
    // also grabs the total number of bukcets
    // and confirms that all existing comamnd buckets have index-ids below the bucket number
    var ids = this.commands.map((command) => command.id)
    var bucketLength = bucketsStore.bucketNumber().number
    return this.commands.every((command) => this.commandValidates(command, ids, bucketLength) )
  },

  commandValidates(command, allCommandIds, bucketLength) {
    // returns true iff both command's successors are either falsy or exist in the passed in array AND the command bucket has an id below the passed in BucketLength
    return this.successorExists(command.nextCommand, allCommandIds) &&
      this.successorExists(command.alternateNext, allCommandIds) &&
      command.bucketId < bucketLength
  },

  successorExists(successor, allCommandIds) {
    // returns true iff the successor id is falsy (0 or undefined) or exists as a value in the passed in array
    if (successor) {
      return allCommandIds.includes(successor)
    }

    return true
  }
}
