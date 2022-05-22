import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcAdd} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import CardCreateIdeaSession from './CardCreateIdeaSession';
import CreateAdditionalAttachmentField from './CreateAdditionalAttachmentField';
import Divider from './Divider';
import Gap from './Gap';

const CreateAdditionalAttachment = ({
  onNextReff,
  onUpdate = () => {},
  onNextRequest = () => {},
}) => {
  const [attachment, setAttachment] = useState([
    {type: null, source: '', desc: '', documentName: ''},
  ]);

  useEffect(() => {
    let isCompleted = true;
    if (attachment.length === 1) {
      if (
        attachment[0].type !== null ||
        attachment[0].source !== '' ||
        attachment[0].desc !== ''
      ) {
        isCompleted = false;
        if (
          attachment[0].type !== null &&
          attachment[0].source !== '' &&
          attachment[0].desc !== ''
        ) {
          isCompleted = true;
        }
      }
    } else {
      for (let i = 0; i < attachment.length; i++) {
        if (
          attachment[i].type === null ||
          attachment[i].source === '' ||
          attachment[i].desc === ''
        ) {
          isCompleted = false;
          break;
        }
      }
    }
    onUpdate(isCompleted);
  }, [attachment]);

  useEffect(() => {
    if (onNextReff !== undefined) {
      if (attachment.length <= 1) {
        if (
          attachment[0].type === null ||
          attachment[0].source === '' ||
          attachment[0].desc === ''
        ) {
          onNextReff.current = () => onNextRequest([]);
        } else {
          onNextReff.current = () => onNextRequest(attachment);
        }
      } else {
        onNextReff.current = () => onNextRequest(attachment);
      }
    }
  }, [attachment]);

  return (
    <CardCreateIdeaSession
      title="Additional Attachment (Optional)"
      desc="Other attachments that are not required, but are considered necessary to support the idea."
      mandatory={false}>
      {attachment.map((item, index) => {
        return (
          <>
            <CreateAdditionalAttachmentField
              withSelfDelete={attachment.length > 1 ? true : false}
              onSelfDelete={() => {
                let tempAttachment = [...attachment];
                tempAttachment.splice(index, 1);
                setAttachment(tempAttachment);
              }}
              onClear={() => {
                setAttachment([{type: null, source: '', desc: ''}]);
              }}
              selectedType={item.type}
              onTypeChange={newType => {
                let tempAttachment = [...attachment];
                tempAttachment[index].type = newType;
                tempAttachment[index].source = '';
                tempAttachment[index].documentName = '';
                setAttachment(tempAttachment);
              }}
              sourceValue={item.source}
              onSourceChange={(newSource, newDocumentSourceName = '') => {
                let tempAttachment = [...attachment];
                tempAttachment[index].source = newSource;
                tempAttachment[index].documentName = newDocumentSourceName;
                setAttachment(tempAttachment);
              }}
              descValue={item.desc}
              onDescChange={newDesc => {
                let tempAttachment = [...attachment];
                tempAttachment[index].desc = newDesc;
                setAttachment(tempAttachment);
              }}
              attachmentDocumentName={item.documentName}
            />
            {index !== attachment.length - 1 && (
              <>
                <Gap height={16} />
                <Divider />
                <Gap height={16} />
              </>
            )}
            {index === attachment.length - 1 && (
              <>
                <Gap height={16} />
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      let tempAttachment = [...attachment];
                      tempAttachment.push({type: null, source: '', desc: ''});
                      setAttachment(tempAttachment);
                    }}>
                    <IcAdd />
                    <Gap width={8} />
                    <Text style={styles.addAnotherAttachmentText}>
                      Add another attachment
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        );
      })}
    </CardCreateIdeaSession>
  );
};

export default CreateAdditionalAttachment;

const styles = StyleSheet.create({
  fieldTitle: {
    marginBottom: 8,
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    lineHeight: 17,
  },
  board: {
    height: 155,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 12,
    fontFamily: fonts.primary[400],
    fontSize: 16,
    color: colors.text.primary,
  },
  addAnotherAttachmentText: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
    color: colors.primary,
  },
});
