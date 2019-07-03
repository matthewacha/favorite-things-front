export default {
  inputs: [
    {
      type: 'text',
      label: 'Title',
      required: true,
      color: 'deep-purple',
      counter: 10,
      rules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      vModel: '',
    },
    {
      type: 'text',
      label: 'Description',
      required: true,
      color: 'deep-purple',
      counter: 250,
      rules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 250)
          || 'Description must be less than 250 characters',
      ],
      vModel: '',
    },
  ],
};
